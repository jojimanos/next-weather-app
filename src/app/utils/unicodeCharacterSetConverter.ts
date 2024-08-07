function getVowelVariations(letter: string): string {
  const variations: { [key: string]: string } = {
    a: "aAàÀáÁâÂãÃäÄåÅāĀąĄăĂǎǍạẠảẢấẤầẦẩẨẫẪậẬắẮằẰẳẲẵẴặẶ",
    e: "eEèÈéÉêÊëËēĒĕĔėĖęĘěĚȅȄȇȆẹẸẻẺẽẼếẾềỀểỂễỄệỆ",
    i: "iIìÌíÍîÎïÏĩĨīĪĭĬįĮıǐȉȈȋȊịỊỉỈĩĨ",
    o: "oOòÒóÓôÔõÕöÖōŌŏŎőŐơƠǒǑǫǪȍȌȏȎọỌỏỎốỐồỒổỔỗỖộỘớỚờỜởỞỡỠợỢ",
    u: "uUùÙúÚûÛüÜũŨūŪŭŬůŮűŰųŲǔȕȔȗȖụỤủỦứỨừỪửỬữỮựỰ",
    A: "aAàÀáÁâÂãÃäÄåÅāĀąĄăĂǎǍạẠảẢấẤầẦẩẨẫẪậẬắẮằẰẳẲẵẴặẶ",
    E: "eEèÈéÉêÊëËēĒĕĔėĖęĘěĚȅȄȇȆẹẸẻẺẽẼếẾềỀểỂễỄệỆ",
    I: "iIìÌíÍîÎïÏĩĨīĪĭĬįĮıǐȉȈȋȊịỊỉỈĩĨ",
    O: "oOòÒóÓôÔõÕöÖōŌŏŎőŐơƠǒǑǫǪȍȌȏȎọỌỏỎốỐồỒổỔỗỖộỘớỚờỜởỞỡỠợỢ",
    U: "uUùÙúÚûÛüÜũŨūŪŭŬůŮűŰųŲǔȕȔȗȖụỤủỦứỨừỪửỬữỮựỰ",
  };

  return variations[letter] || letter;
}

export function unicodeCharacterSetConverter(input: string): RegExp {
  let pattern = "";

  for (const char of input) {
    if ("aeiouAEIOU".includes(char)) {
      pattern += `[${getVowelVariations(char)}]`;
    } else {
      pattern += char;
    }
  }

  return new RegExp(pattern, "igu");
}

