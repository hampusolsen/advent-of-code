from pathlib import Path

import pytest

from quadcopter import Quadcopter


@pytest.fixture
def sample_input():
    path = Path(__file__).parents[1] / "sample_input.txt"
    with path.open() as file:
       return file.read()


def test_creates_map_when_initialized(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert quadcopter.map == [
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
    ]


def test_gets_trees_to_the_left(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert [2] == quadcopter.get_trees_to_the_left(1, 1)
    assert [5, 5, 2] == quadcopter.get_trees_to_the_left(3, 1)


def test_gets_trees_to_the_right(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert [5, 1, 2] == quadcopter.get_trees_to_the_right(1, 1)
    assert [2] == quadcopter.get_trees_to_the_right(3, 1)


def test_gets_trees_to_the_top(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert [0] == quadcopter.get_trees_to_the_top(1, 1)
    assert [5, 5, 0] == quadcopter.get_trees_to_the_top(1, 3)


def test_gets_trees_to_the_bottom(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert [5, 3, 5] == quadcopter.get_trees_to_the_bottom(1, 1)
    assert [5] == quadcopter.get_trees_to_the_bottom(1, 3)


def test_checks_if_tree_is_visible(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert True == quadcopter.check_if_tree_is_visible(1, 1)
    assert True == quadcopter.check_if_tree_is_visible(2, 1)
    assert False == quadcopter.check_if_tree_is_visible(3, 1)
    assert True == quadcopter.check_if_tree_is_visible(1, 2)
    assert False == quadcopter.check_if_tree_is_visible(2, 2)
    assert True == quadcopter.check_if_tree_is_visible(2, 3)
    assert True == quadcopter.check_if_tree_is_visible(2, 3)


def test_gets_total_amount_of_visible_trees(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert 21 == quadcopter.get_total_visible_trees()


def test_gets_scenic_score(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert 4 == quadcopter.get_scenic_score(2, 1)
    assert 8 == quadcopter.get_scenic_score(2, 3)


def test_gets_highest_scenic_score(sample_input):
    quadcopter = Quadcopter(sample_input)
    assert 8 == quadcopter.get_highest_scenic_score()
