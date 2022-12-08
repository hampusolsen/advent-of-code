#!/usr/bin/env php
<?php
require __DIR__.'/../vendor/autoload.php';

use Symfony\Component\Console\Application;
use TuningTrouble\SolveCommand;

$application = new Application();

$application->addCommands(
    [
    new SolveCommand(),
    ]
);

$application->run();
