use nom::{
    branch::alt,
    bytes::complete::tag,
    character::complete::{self, alpha1, anychar, char, line_ending},
    multi::{many_till, separated_list1},
    sequence::{delimited, preceded},
    IResult,
};

fn cell(input: &str) -> IResult<&str, Option<&str>> {
    let (input, crate_slot) = alt((tag("   "), delimited(char('['), alpha1, char(']'))))(input)?;

    // None placeholders required to parse stacks later
    let result = match crate_slot {
        "   " => None,
        v => Some(v),
    };

    Ok((input, result))
}

fn row(input: &str) -> IResult<&str, Vec<Option<&str>>> {
    let (input, line) = separated_list1(char(' '), cell)(input)?;

    Ok((input, line))
}

fn matrix(input: &str) -> IResult<&str, Vec<Vec<&str>>> {
    let (input, stacks) = separated_list1(line_ending, row)(input)?;

    let mut result: Vec<Vec<&str>> = vec![];
    // populate result with required vectors
    for _ in 0..stacks.first().unwrap().len() {
        result.push(vec![]);
    }
    for stack in stacks.iter().rev() {
        for (i, cr) in stack.iter().enumerate() {
            // discard placeholders
            if cr.is_some() {
                result[i].push(cr.unwrap())
            }
        }
    }

    // discard lines until instructions
    let (input, _) = line_ending(input)?;
    let (input, _) = many_till(anychar, line_ending)(input)?;
    let (input, _) = line_ending(input)?;

    Ok((input, result))
}

#[derive(Debug)]
struct Instruction {
    amount: u32,
    from: u32,
    to: u32,
}

type Instructions = Vec<Instruction>;

fn instruction(input: &str) -> IResult<&str, Instruction> {
    let (input, amount) = preceded(tag("move "), complete::u32)(input)?;
    let (input, from) = preceded(tag(" from "), complete::u32)(input)?;
    let (input, to) = preceded(tag(" to "), complete::u32)(input)?;

    Ok((input, Instruction { amount, from, to }))
}

fn instructions(input: &str) -> IResult<&str, Instructions> {
    let (input, instructions) = separated_list1(line_ending, instruction)(input)?;

    Ok((input, instructions))
}

fn parse_input_into_stacks_and_instructions(input: &str) -> (Vec<Vec<&str>>, Instructions) {
    let (input, stacks) = matrix(input).unwrap();
    let (_, instructions) = instructions(input).unwrap();

    (stacks, instructions)
}

fn crate_mover_9000(ins: Instruction, matrix: &mut Vec<Vec<&str>>) {
    let from_index = ins.from as usize - 1;
    let drain_range = matrix[from_index].len() - ins.amount as usize..;
    let mut drained: Vec<&str> = matrix[from_index].drain(drain_range).rev().collect();

    matrix[ins.to as usize - 1].append(&mut drained);
}

fn crate_mover_9001(ins: Instruction, matrix: &mut Vec<Vec<&str>>) {
    let from_index = ins.from as usize - 1;
    let drain_range = matrix[from_index].len() - ins.amount as usize..;
    let mut drained: Vec<&str> = matrix[from_index].drain(drain_range).collect();

    matrix[ins.to as usize - 1].append(&mut drained);
}

fn solution(input: &str, crate_mover: fn(Instruction, &mut Vec<Vec<&str>>) -> ()) -> String {
    let (mut matrix, instructions) = parse_input_into_stacks_and_instructions(input);
    for instruction in instructions {
        crate_mover(instruction, &mut matrix)
    }
    let result: String = matrix
        .iter()
        .map(|v| match v.iter().last() {
            Some(x) => x,
            None => "",
        })
        .collect();

    result.to_string()
}

pub fn solve_part_one(input: &str) -> String {
    solution(input, crate_mover_9000)
}

pub fn solve_part_two(input: &str) -> String {
    solution(input, crate_mover_9001)
}

#[cfg(test)]
mod tests {
    use super::*;

    const INPUT: &str = "    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2";

    #[test]
    fn it_parses_a_single_crate() {
        assert_eq!(cell("[A]"), Ok(("", Some("A"))));
        assert_eq!(cell("[A] "), Ok((" ", Some("A"))));
        assert_eq!(cell("   "), Ok(("", None)));
        assert_eq!(cell("    "), Ok((" ", None)));
    }

    #[test]
    fn it_parses_a_line_of_crates() {
        assert_eq!(
            row("[A] [B] [C]"),
            Ok(("", vec![Some("A"), Some("B"), Some("C")])),
        );
        assert_eq!(
            row("[A] [B] [C]\n    [X] [Y]"),
            Ok(("\n    [X] [Y]", vec![Some("A"), Some("B"), Some("C")])),
        );
    }

    #[test]
    fn it_parses_all_supply_stacks() {
        assert_eq!(
            matrix("[A]     [C]\n[X] [Y] [Z]\n 1   2   3 \n\ninstructions"),
            Ok((
                "instructions",
                vec![vec!["X", "A"], vec!["Y"], vec!["Z", "C"],]
            )),
        );
        assert_eq!(
            matrix("[A]     [C]\n[X]     [Z]\n 1   2   3 \n\ninstructions"),
            Ok((
                "instructions",
                vec![vec!["X", "A"], vec![], vec!["Z", "C"],]
            )),
        );
    }

    #[test]
    fn it_parses_a_single_instruction() {
        let (remainder, instruction) = instruction("move 1 from 1 to 2").unwrap();

        assert_eq!(remainder, "");
        assert_eq!(instruction.amount, 1);
        assert_eq!(instruction.from, 1);
        assert_eq!(instruction.to, 2);
    }

    #[test]
    fn crate_mover_9000_follows_instruction() {
        let (_, mut matrix) = matrix(INPUT).unwrap();
        let (_, instruction) = instruction("move 1 from 2 to 1").unwrap();
        crate_mover_9000(instruction, &mut matrix);
        assert_eq!(matrix, vec![vec!["Z", "N", "D"], vec!["M", "C"], vec!["P"]]);
    }

    #[test]
    fn crate_mover_9001_follows_instruction() {
        let (_, mut matrix) = matrix(INPUT).unwrap();
        let (_, instruction) = instruction("move 2 from 2 to 1").unwrap();
        crate_mover_9001(instruction, &mut matrix);
        assert_eq!(matrix, vec![vec!["Z", "N", "C", "D"], vec!["M"], vec!["P"]]);
    }

    #[test]
    fn it_solves_part_one() {
        assert_eq!(solve_part_one(INPUT), "CMZ");
    }

    #[test]
    fn it_solves_part_two() {
        assert_eq!(solve_part_two(INPUT), "MCD");
    }
}
