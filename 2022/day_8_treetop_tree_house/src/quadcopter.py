from typing import List


class Quadcopter:
    map: List[List[int]]
    def __init__(self, input: str):
        self.map = [[int(c) for c in l] for l in input.splitlines()] 


    # returned trees will be in order starting from tree at x, y
    def get_trees_to_the_left(self, x: int, y: int):
        return self.map[y][x-1::-1]


    # returned trees will be in order starting from tree at x, y
    def get_trees_to_the_right(self, x: int, y: int):
        return self.map[y][x+1:]


    # returned trees will be in order starting from tree at x, y
    def get_trees_to_the_top(self, x: int, y: int):
        return [t[x] for t in self.map[y-1::-1]]


    # returned trees will be in order starting from tree at x, y
    def get_trees_to_the_bottom(self, x: int, y: int):
        return [t[x] for t in self.map[y+1:]]


    def check_if_tree_is_visible(self, x: int, y: int):
        if all(t < self.map[y][x] for t in self.get_trees_to_the_left(x, y)):
            return True
        if all(t < self.map[y][x] for t in self.get_trees_to_the_right(x, y)):
            return True
        if all(t < self.map[y][x] for t in self.get_trees_to_the_top(x, y)):
            return True
        if all(t < self.map[y][x] for t in self.get_trees_to_the_bottom(x, y)):
            return True

        return False


    def get_total_visible_trees(self):
        outer_trees_count = len(self.map) * 2 + (len(self.map[0]) - 2) * 2
        visible_inner_trees = [t for y, r in enumerate(self.map[1:-1]) for x, t in enumerate(r[1:-1]) if self.check_if_tree_is_visible(x + 1, y + 1)]

        return outer_trees_count + len(visible_inner_trees)


    def _get_directional_scenic_score(self, tree: int, trees: List[int]):
        score = 0

        for _tree in trees:
            score += 1
            if _tree >= tree:
                break

        return score
            

    def get_scenic_score(self, x: int, y: int):
        tree = self.map[y][x]

        left_score = self._get_directional_scenic_score(tree, self.get_trees_to_the_left(x, y))
        right_score = self._get_directional_scenic_score(tree, self.get_trees_to_the_right(x, y))
        bottom_score = self._get_directional_scenic_score(tree, self.get_trees_to_the_bottom(x, y))
        top_score = self._get_directional_scenic_score(tree, self.get_trees_to_the_top(x, y))

        return left_score * right_score * bottom_score * top_score


    def get_highest_scenic_score(self):
        return max([self.get_scenic_score(x, y) for y in range(1, len(self.map)) for x in range(1, len(self.map[0]))])

