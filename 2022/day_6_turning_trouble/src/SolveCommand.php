<?php

namespace TuningTrouble;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: "solve")]
final class SolveCommand extends Command
{
  protected function configure(): void
  {
    $this->addOption("length", null, InputOption::VALUE_REQUIRED, "Length of the first unique slice", 4);
  }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $length = $input->getOption("length");
        $test_input = file_get_contents(__DIR__."/../inputs/one.txt", "r");
        $parser = new Parser();

        [, $index] = $parser->findFirstUniqueSlice($test_input, $length);

        $marker = $index + $length;

        $output->writeln("{$marker} amount of characters had to be processed.");

        return 0;
    }
}
