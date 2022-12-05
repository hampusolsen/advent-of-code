from pathlib import Path
import re
from typing import Callable
import pytest


@pytest.fixture
def example_input():
    path = Path(__file__).parent / 'inputs/part_one.sample'
    with path.open() as file:
        return file.read().splitlines()


def parse_line_into_ranges(line: str):
    return list(map(lambda c: int(c), re.split('[,-]', line)))


def test_parses_line_into_ranges():
    line = '3-5,6-8'
    assert [3, 5, 6, 8] == parse_line_into_ranges(line)
    line = '3-150,6-100'
    assert [3, 150, 6, 100] == parse_line_into_ranges(line)


def ranges_completely_overlaps(ranges):
    flow, fhigh, slow, shigh = ranges
    if slow <= flow <= shigh and slow <= fhigh <= shigh:
        return True
    if flow <= slow <= fhigh and flow <= shigh <= fhigh:
        return True
    return False


def ranges_partially_overlaps(ranges):
    flow, fhigh, slow, shigh = ranges
    if slow <= flow <= shigh or slow <= fhigh <= shigh:
        return True
    if flow <= slow <= fhigh or flow <= shigh <= fhigh:
        return True
    return False


def test_checks_if_ranges_completely_overlaps():
    ranges = [3, 5, 2, 8]
    assert True == ranges_completely_overlaps(ranges) 
    ranges = [3, 5, 6, 8]
    assert False == ranges_completely_overlaps(ranges) 


def find_overlaps_factory(checker: Callable):
    def fn(lines): 
        return [line for line in lines if checker(parse_line_into_ranges(line))]
    return fn


def test_sums_complete_overlaps(example_input: list):
    find_complete_overlaps = find_overlaps_factory(ranges_completely_overlaps)
    overlaps = find_complete_overlaps(example_input)
    assert len(overlaps) == 2


def test_sums_partial_overlaps(example_input: list):
    find_partial_overlaps = find_overlaps_factory(ranges_partially_overlaps)
    overlaps = find_partial_overlaps(example_input)
    assert len(overlaps) == 4

