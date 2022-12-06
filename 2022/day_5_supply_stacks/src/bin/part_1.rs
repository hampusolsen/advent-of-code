use std::fs;
use supply_stacks::solve_part_one;

fn main() {
    let f = fs::read_to_string("./input.txt").unwrap();
    println!("{}", solve_part_one(&f));
}
