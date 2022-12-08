<?php

namespace TuningTrouble;


final class Parser
{
    private const HAS_DUPLICATE_CHARS = '/^.*(.).*\1.*$/';

    /*
    *  Returns the first unique string slice of length $length as well
    *  as the index of the first character in that unique string slice.
    */
    public function findFirstUniqueSlice(string $input, int $length = 4): ?array
    {
        $lastIndexToCheck = strlen($input) - $length;

        for ($i = 0; $i <= $lastIndexToCheck; $i++) {
            $currentSlice = substr($input, $i, $length);
            $hasDuplicates = preg_match(self::HAS_DUPLICATE_CHARS, $currentSlice);

            if (!$hasDuplicates) {
                return [$currentSlice, $i];
            }
        }

        return null;
    }
}
