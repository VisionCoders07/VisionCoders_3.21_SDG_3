window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  const loginScreen = document.getElementById("login-screen");
  const permissionPopup = document.getElementById("permission-popup");

  const allowBtn = document.getElementById("allow-btn");
  const denyBtn = document.getElementById("deny-btn");

  // Show login screen after key press
  document.addEventListener("keydown", () => {
    splash.style.opacity = "0";
    splash.style.visibility = "hidden";

    loginScreen.style.visibility = "visible";
    loginScreen.style.opacity = "1";
  }, { once: true });

  // Function to open permission popup
  function showPermissionPopup() {
    permissionPopup.style.visibility = "visible";
    permissionPopup.style.opacity = "1";
  }

  // LOGIN → ask permission
  document.querySelector(".login-btn").addEventListener("click", showPermissionPopup);

  // SKIP → STILL ask permission
  document.querySelector(".skip-btn").addEventListener("click", showPermissionPopup);

  // ALLOW → Request location then go to next page
  allowBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location granted:", position.coords);
          window.location.href = "nextpage.html";
        },
        () => {
          alert("Location permission denied. Redirecting anyway.");
          window.location.href = "nextpage.html";
        }
      );
    } else {
      alert("Geolocation not supported. Redirecting.");
      window.location.href = "nextpage.html";
    }
  });

  // DENY → Close popup but still continue
  denyBtn.addEventListener("click", () => {
    permissionPopup.style.opacity = "0";
    permissionPopup.style.visibility = "hidden";

    setTimeout(() => {
      window.location.href = "nextpage.html";
    }, 500);
  });
});
