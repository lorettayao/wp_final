const fs = require("fs");

try {
  const jsonString = fs.readFileSync("test-results/test-results.json");
  const jsonObject = JSON.parse(jsonString);

  const tests = jsonObject.suites
    .map((suite) =>
      suite.specs.map((spec) => {
        const match = spec.title.match(/^(\d+)\. (.*)$/);
        const status = spec.tests[0].results[0].status;
        const errors = spec.tests[0].results[0].errors;
        return {
          score: status === "passed" ? 10 : 0,
          max_score: 10,
          status,
          name: match[2],
          name_format: "text",
          number: match[1],
          ...(errors.length > 0 && {
            output: errors.map((error) => error.message).join("\n\n"),
            output_format: "ansi",
          }),
          visibility: "visible",
          extra_data: {
            duration: spec.tests[0].results[0].duration,
          },
        };
      }),
    )
    .flat();

  const scoreArray = [0, 15, 30, 45, 60, 70, 80, 85, 90, 95, 100];
  const score = scoreArray[jsonObject.stats.expected];
  const execution_time = jsonObject.stats.duration;
  const leaderboard = [{ name: "score", value: score, order: "desc" }];

  console.log(
    JSON.stringify({
      score,
      execution_time,
      tests,
      leaderboard,
      visibility: "visible",
      /* Hide stdout from students */
      // stdout_visibility: 'visible',
    }),
  );
} catch (err) {
  console.error("Error:", err);
}
