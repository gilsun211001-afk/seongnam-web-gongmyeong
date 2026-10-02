export const recommendations = [
  {label:"홍보글을 매번 새로 씁니다",title:"홍보글 초안 도우미",detail:"매장 정보와 서비스 특징을 한 번 정리해 블로그와 인스타그램 초안으로 바꾸는 방법을 먼저 확인합니다."},
  {label:"문의가 여러 곳에 흩어집니다",title:"문의 정리 도구",detail:"고객에게 받을 항목을 통일하고 상담 내용을 한눈에 보는 흐름이 적합합니다."},
  {label:"예약이나 견적을 자주 놓칩니다",title:"예약·견적 정리 도구",detail:"요청 조건을 빠짐없이 받고 다음 행동을 표시하는 작은 도구부터 검토합니다."},
  {label:"무엇을 자동화할지 모르겠습니다",title:"AI 업무진단 준비",detail:"반복 업무, 소요 시간, 원하는 결과를 정리해 우선순위를 찾습니다."}
];

export function recommendationAt(index) {
  if (!Number.isInteger(index) || !recommendations[index]) throw new Error("존재하지 않는 선택입니다.");
  return recommendations[index];
}

if (typeof document !== "undefined") {
  const choices = document.querySelector("#choices");
  const output = document.querySelector("#recommendation");
  const select = index => {
    const item = recommendationAt(index);
    [...choices.children].forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
    output.replaceChildren(Object.assign(document.createElement("strong"), {textContent:item.title}), document.createTextNode(item.detail));
  };
  recommendations.forEach((item, index) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "choice"; button.textContent = item.label; button.setAttribute("aria-pressed", "false"); button.addEventListener("click", () => select(index)); choices.append(button);
  });
  select(0);
}
