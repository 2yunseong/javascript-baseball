const MissionUtils = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.count = "";
    this.input;
  }
  play() {
    this.gameStart();
    this.count = this.generateCount(this.generateRandomList());
    this.input = this.getUserInput();
    this.vaildInput(this.input);
    this.printCount(this.decideCount(this.count, this.input));
  }

  gameStart() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
  }

  generateCount(numberList) {
    return numberList.reduce((acc, cur) => acc + cur, "");
  }

  generateRandomList() {
    return MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
  }

  getUserInput() {
    MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (answer) => {});
  }

  vaildInput(input) {
    if (!this.isVaildNumberFormat(input)) {
      throw new Error("형식이 잘못되었습니다.");
    }
    if (this.isDuplicate(input)) {
      throw new Error("중복된 숫자가 존재합니다.");
    }
    return input;
  }
  isVaildNumberFormat(target) {
    return /^[1-9]{3}$/.test(target);
  }

  isDuplicate(target) {
    const charList = target.split("");
    const firstLetter = charList.shift();
    return (
      charList.includes(firstLetter) ||
      charList.reduce((acc, cur) => acc === cur)
    );
  }

  decideCount(computerCount, userCount) {
    let strikeCount = this.decideStrikeCount(computerCount, userCount);
    let ballCount = this.decideBallCount(computerCount, userCount);

    return { strikeCount, ballCount };
  }

  decideStrikeCount(computerCount, userCount) {
    let count = 0;
    for (let i = 0; i < computerCount.length; i++) {
      if (computerCount[i] === userCount[i]) {
        count++;
      }
    }
    return count;
  }

  decideBallCount(computerCount, userCount) {
    let count = 0;
    for (let i = 0; i < computerCount.length; i++) {
      if (
        userCount.includes(computerCount[i]) &&
        computerCount[i] !== userCount[i]
      ) {
        count++;
      }
    }
    return count;
  }

  makeCountMessage(counts) {
    if (counts.strikeCount === 0 && counts.ballCount === 0) {
      return "낫싱";
    }
    if (counts.strikeCount === 0) {
      return `${counts.ballCount}볼`;
    }
    if (counts.ballCount === 0) {
      return `${counts.strikeCount}스트라이크`;
    }
    return `${counts.ballCount}볼 ${counts.strikeCount}스트라이크`;
  }

  printCount(counts) {
    MissionUtils.Console.print(this.makeCountMessage(counts));
  }
}

module.exports = App;
