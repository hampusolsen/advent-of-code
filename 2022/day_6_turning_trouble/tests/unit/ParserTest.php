<?php

use PHPUnit\Framework\TestCase;
use TuningTrouble\Parser;


/**
  mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 7
  bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
  nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
  nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
  zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
 */

final class ParserTest extends TestCase
{
    private const SAMPLES = [
      [
        "input" => "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        "marker" => 7,
        "slice" => "jpqm"
      ],
      [
        "input" => "bvwbjplbgvbhsrlpgdmjqwftvncz",
        "marker" => 5,
        "slice" => "vwbj"
      ],
      [
        "input" => "nppdvjthqldpwncqszvftbrmjlhg",
        "marker" => 6,
        "slice" => "pdvj"
      ],
      [
        "input" => "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        "marker" => 10,
        "slice" => "rfnt"
      ],
      [
        "input" => "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        "marker" => 11,
        "slice" => "zqfr"
      ],
    ];

    public function testFindsFirstUniqueSliceOfSpecifiedLength()
    {
        $parser = new Parser();
        $length = 4;

        foreach (self::SAMPLES as $sample) {
            [$slice, $index] = $parser->findFirstUniqueSlice(
                $sample["input"],
                $length
            );

            self::assertEquals($sample["slice"], $slice);
            // this solves part one
            self::assertEquals($sample["marker"], $index + $length);
        }
    }
}
