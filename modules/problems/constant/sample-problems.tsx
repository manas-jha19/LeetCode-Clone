export const sampleDPProblem = {
  title: "Climbing Stairs",

  description:
    "You are climbing a staircase with n steps. Each time you can climb either 1 or 2 steps. Return the number of distinct ways to reach the top.",

  difficulty: "EASY" as const,

  tags: ["Dynamic Programming", "Math", "Memoization"],

  constraints: "1 <= n <= 45",

  hints:
    "To reach step n, you can come from step n-1 or step n-2. Can you use this observation to build a recurrence?",

  editorial:
    "Use dynamic programming. Let dp[i] represent the number of ways to reach step i. The recurrence is dp[i] = dp[i - 1] + dp[i - 2], with dp[1] = 1 and dp[2] = 2.",

  // Test cases
  testCases: [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "5", output: "8" },
  ],

  // Examples displayed in the problem description
  example: {
    JAVASCRIPT: {
      input: "n = 3",
      output: "3",
      explanation: "There are three ways: 1+1+1, 1+2, and 2+1.",
    },

    JAVA: {
      input: "n = 3",
      output: "3",
      explanation: "There are three distinct ways to reach the third step.",
    },

    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation: "There are three distinct ways to reach the third step.",
    },
  },

  // Starter code shown in the user's editor
  codeSnippets: {
    JAVASCRIPT: `function solution(n) {
  // Write your code here
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const n = Number(input);

console.log(solution(n));`,

    PYTHON: `def solution(n):
    # Write your code here
    pass


import sys

n = int(sys.stdin.read().strip())
print(solution(n))`,

    JAVA: `public class Main {
    static int solution(int n) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) throws Exception {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        int n = sc.nextInt();

        System.out.println(solution(n));
    }
}`,
  },

  // Complete executable reference solutions
  referenceSolutions: {
    JAVASCRIPT: `function solution(n) {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const n = Number(input);

console.log(solution(n));`,

    PYTHON: `def solution(n):
    if n <= 2:
        return n

    prev2 = 1
    prev1 = 2

    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1


import sys

n = int(sys.stdin.read().strip())
print(solution(n))`,

    JAVA: `public class Main {
    static int solution(int n) {
        if (n <= 2) return n;

        int prev2 = 1;
        int prev1 = 2;

        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    public static void main(String[] args) throws Exception {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        int n = sc.nextInt();

        System.out.println(solution(n));
    }
}`,
  },
};

export const sampleStringProblem = {
  title: "Longest Substring Without Repeating Characters",

  description:
    "Given a string s, find the length of the longest substring without repeating characters.",

  difficulty: "MEDIUM" as const,

  tags: ["Strings", "Sliding Window", "Hash Table"],

  constraints:
    "0 <= s.length <= 50000\ns consists of English letters, digits, symbols, and spaces.",

  hints:
    "Use a sliding window to maintain a substring containing unique characters. When a duplicate character appears, move the left boundary forward.",

  editorial:
    "Maintain a window with no duplicate characters. Use a Map to store the last seen index of each character. If a character repeats inside the current window, move the left boundary to one position after its previous occurrence. Update the maximum window length at every step.",

  // Test cases
  testCases: [
    { input: "abcabcbb", output: "3" },
    { input: "bbbbb", output: "1" },
    { input: "pwwkew", output: "3" },
    { input: "", output: "0" },
  ],

  // Examples displayed in the problem description
  example: {
    JAVASCRIPT: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation:
        'The answer is "abc", with a length of 3. "bca" and "cab" are also valid.',
    },

    JAVA: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation:
        'The longest substring without repeating characters is "abc", whose length is 3.',
    },

    PYTHON: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation:
        'The longest substring without repeating characters is "abc", whose length is 3.',
    },
  },

  // Starter code shown in the user's editor
  codeSnippets: {
    JAVASCRIPT: `function solution(s) {
  // Write your code here
}

const fs = require("fs");
let s = fs.readFileSync(0, "utf8");

if (s.endsWith(String.fromCharCode(10))) {
  s = s.slice(0, -1);

  if (s.endsWith(String.fromCharCode(13))) {
    s = s.slice(0, -1);
  }
}

console.log(solution(s));`,

    PYTHON: `def solution(s):
    # Write your code here
    pass


import sys

s = sys.stdin.read()

if s.endswith(chr(10)):
    s = s[:-1]

    if s.endswith(chr(13)):
        s = s[:-1]

print(solution(s))`,

    JAVA: `public class Main {
    static int solution(String s) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) throws Exception {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";

        System.out.println(solution(s));
    }
}`,
  },

  // Complete executable reference solutions
  referenceSolutions: {
    JAVASCRIPT: `function solution(s) {
  const lastSeen = new Map();

  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }

    lastSeen.set(char, right);

    maxLength = Math.max(
      maxLength,
      right - left + 1
    );
  }

  return maxLength;
}

const fs = require("fs");
let s = fs.readFileSync(0, "utf8");

if (s.endsWith(String.fromCharCode(10))) {
  s = s.slice(0, -1);

  if (s.endsWith(String.fromCharCode(13))) {
    s = s.slice(0, -1);
  }
}

console.log(solution(s));`,

    PYTHON: `def solution(s):
    last_seen = {}

    left = 0
    max_length = 0

    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1

        last_seen[char] = right

        max_length = max(
            max_length,
            right - left + 1
        )

    return max_length


import sys

s = sys.stdin.read()

if s.endswith(chr(10)):
    s = s[:-1]

    if s.endswith(chr(13)):
        s = s[:-1]

print(solution(s))`,

    JAVA: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    static int solution(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }

            lastSeen.put(c, right);

            maxLength = Math.max(
                maxLength,
                right - left + 1
            );
        }

        return maxLength;
    }

    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";

        System.out.println(solution(s));
    }
}`,
  },
};

export const SAMPLE_PROBLEMS = {
  DP: sampleDPProblem,
  String: sampleStringProblem,
};
