export function generateDraft({business, offer, features, tone = "friendly", cta = ""}) {
  const clean = value => String(value || "").trim().replace(/\s+/g, " ");
  const data = { business: clean(business), offer: clean(offer), features: clean(features), cta: clean(cta) };
  if (!data.business || !data.offer || !data.features) throw new Error("업종, 상품 또는 서비스, 특징을 모두 입력해 주세요.");

  const openings = {
    friendly: `${data.business}에서 ${data.offer}을 찾고 계신가요?`,
    calm: `${data.business}의 ${data.offer} 안내입니다.`,
    clear: `${data.business} ${data.offer}, 핵심 내용만 정리했습니다.`
  };
  const ending = data.cta ? `\n\n${data.cta}` : "";
  const blog = `${openings[tone] || openings.friendly}\n\n${data.features}\n\n방문하거나 신청하기 전에 일정과 이용 조건을 확인해 주세요.${ending}`;
  const instagram = `${data.offer}\n\n${data.features}${ending}\n\n#${data.business.replace(/\s/g, "")} #${data.offer.replace(/\s/g, "")} #소상공인`;
  const titles = [
    `${data.business} ${data.offer}, 이용 전에 확인할 내용`,
    `${data.offer} 찾는 분을 위한 ${data.business} 안내`,
    `${data.business}에서 준비한 ${data.offer}`
  ];
  return { blog, instagram, titles };
}

if (typeof document !== "undefined") {
  const form = document.querySelector("#generator");
  const results = document.querySelector("#results");
  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      const draft = generateDraft(Object.fromEntries(new FormData(form)));
      const items = [
        ["제목 후보", draft.titles.join("\n")],
        ["블로그 초안", draft.blog],
        ["인스타그램 초안", draft.instagram]
      ];
      results.replaceChildren(...items.map(([title, value]) => {
        const card = document.createElement("article"); card.className = "card";
        const heading = document.createElement("h2"); heading.textContent = title;
        const output = document.createElement("div"); output.className = "output"; output.textContent = value;
        const actions = document.createElement("div"); actions.className = "actions";
        const copy = document.createElement("button"); copy.type = "button"; copy.className = "copy"; copy.textContent = "복사";
        copy.addEventListener("click", async () => { await navigator.clipboard.writeText(value); copy.textContent = "복사됨"; });
        actions.append(copy); card.append(heading, output, actions); return card;
      }));
      results.hidden = false;
    } catch (error) {
      results.hidden = false; results.textContent = error.message;
    }
  });
}
