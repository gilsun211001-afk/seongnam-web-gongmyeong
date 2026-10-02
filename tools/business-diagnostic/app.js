export function buildDiagnostic(input) {
  const clean = value => String(value ?? "").trim().replace(/\s+/g, " ");
  const data = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, clean(value)]));
  for (const key of ["business", "area", "current", "pain", "outcome"]) {
    if (!data[key]) throw new Error("필수 항목을 모두 입력해 주세요.");
  }
  const hours = data.hours && Number.isFinite(Number(data.hours)) ? `${Number(data.hours)}시간` : "확인 필요";
  const suggestion = {
    "홍보글 작성": "업종 정보를 재사용하는 홍보글 초안 도구",
    "문의와 상담 정리": "문의 항목을 표준화하고 상담 요약을 만드는 도구",
    "예약 관리": "예약 요청을 한곳에 모아 확인하는 도구",
    "견적 작성": "조건에 따라 견적 항목을 정리하는 계산·문서 도구",
    "리뷰 답변": "매장 말투를 반영한 리뷰 답변 초안 도구",
    "고객 관리": "상담 단계와 후속 작업을 확인하는 고객관리 도구",
    "반복 문서 작성": "반복 입력을 줄이는 문서 자동 작성 도구",
    "기타": "현재 업무 흐름을 확인한 뒤 정하는 작은 맞춤 도구"
  }[data.area];
  return [
    `[업종] ${data.business}`,
    `[반복 업무] ${data.area}`,
    `[현재 방식] ${data.current}`,
    `[주간 소요 시간] ${hours}`,
    `[가장 불편한 점] ${data.pain}`,
    `[원하는 결과] ${data.outcome}`,
    `[우선 검토할 방법] ${suggestion}`,
    `[문의 출처 코드] TOOL-DIAG`,
    "",
    "이 내용은 초기 상담용 요약이며 실제 제작 범위와 효과는 업무 흐름을 확인한 뒤 결정합니다."
  ].join("\n");
}

if (typeof document !== "undefined") {
  const form = document.querySelector("#diagnostic");
  const result = document.querySelector("#result");
  const summary = document.querySelector("#summary");
  const copy = document.querySelector("#copy");
  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      summary.textContent = buildDiagnostic(Object.fromEntries(new FormData(form)));
      result.hidden = false;
    } catch (error) {
      summary.textContent = error.message; result.hidden = false;
    }
  });
  copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(summary.textContent); copy.textContent = "복사됨";
  });
}
