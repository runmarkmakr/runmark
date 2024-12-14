document.getElementById("verification-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const nickname = document.getElementById("mc-nickname").value;
  const discord = document.getElementById("discord").value;
  const imageFile = document.getElementById("mc-image").files[0];

  if (!nickname || !discord || !imageFile) {
      alert("모든 필드를 입력해 주세요.");
      return;
  }

  const formData = new FormData();
  formData.append("mc-nickname", nickname);
  formData.append("discord", discord);
  formData.append("mc-image", imageFile);
  formData.append("ip", await getClientIP()); // 클라이언트 IP 정보

  try {
      const response = await fetch("/.netlify/functions/submitVerification", {
          method: "POST",
          body: formData
      });
      const result = await response.json();
      
      if (response.ok) {
          alert("인증이 성공적으로 제출되었습니다!");
          window.location.href = "/success.html"; // 인증 성공 페이지로 리디렉션
      } else {
          alert(result.message || "인증 실패. 다시 시도해 주세요.");
      }
  } catch (error) {
      console.error("Error submitting verification:", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
  }
});

// 클라이언트 IP 정보 얻기
async function getClientIP() {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
}
