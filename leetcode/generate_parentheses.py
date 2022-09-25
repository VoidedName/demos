# Given n pairs of parentheses,
# write a function to generate all combinations
# of well-formed parentheses.

# terminals symbols: a, b
# non terminal symbols: A, B, S
# rules:
#   S => B
#   B => () <- apply at n == 0
#   B => (B)
#   B => BB
# start: S

rules = [
    lambda nt: ["B"] if nt == "S" else None,
    lambda nt: ["B", "B"] if nt == "B" else None,
    lambda nt: ["B", "(", ")"] if nt == "B" else None,
]

class Solution:
    def _generate_parans(self, n: int, words: set[tuple[str]]) -> set[tuple[str]]:
        if n == 0:
            return words
        new_words = set()
        for word in words:
            for rule in rules:
                for s_idx in range(len(word)):
                    applied = rule(word[s_idx])
                    if applied:
                        new_words.add(
                            (*word[:s_idx], *applied, *word[s_idx+1:])
                        )
        return self._generate_parans(n-1, new_words)

    def generateParenthesis(self, n: int) -> list[str]:
        if n == 0:
            return []
        expanded = self._generate_parans(n, {("S",)})
        return list({"".join(word).replace("B", "()") for word in expanded})
