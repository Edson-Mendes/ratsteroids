function loadRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking"));
  if (ranking == undefined) {
    ranking = [
      {
        name: "AAAAAAAAAA",
        score: 500,
      },
      {
        name: "BBBBBBBBBB",
        score: 400,
      },
      {
        name: "CCCCCCCCCC",
        score: 300,
      },
      {
        name: "DDDDDDDDDD",
        score: 150,
      },
      {
        name: "EEEEEEEEEE",
        score: 75,
      },
    ];
  }
  return ranking;
}

function saveRanking(ranking) {
  localStorage.setItem("ranking", JSON.stringify(ranking));
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
