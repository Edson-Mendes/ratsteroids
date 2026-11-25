function loadRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking"));
  if (ranking == undefined) {
    ranking = [
      {
        name: "AAAAA",
        score: 500,
      },
      {
        name: "BBBBB",
        score: 400,
      },
      {
        name: "CCCCC",
        score: 300,
      },
      {
        name: "DDDDD",
        score: 150,
      },
      {
        name: "EEEEE",
        score: 75,
      },
    ];
  }
  return ranking;
}

function rankingToString(ranking) {
  const text = `
    ${ranking[0].name} ${ranking[0].score}
    ${ranking[1].name} ${ranking[1].score}
    ${ranking[2].name} ${ranking[2].score}
    ${ranking[3].name} ${ranking[3].score}
    ${ranking[4].name} ${ranking[4].score}
  `;
  return text;
}
