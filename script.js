// HOME

simplyCountdown(".simply-countdown", {
  year: 2025,
  month: 4,
  day: 14,
  hours: 12,
  words: {
    days: { singular: "hari", plural: "hari" },
    hours: { singular: "jam", plural: "jam" },
    minutes: { singular: "menit", plural: "menit" },
    seconds: { singular: "detik", plural: "detik" },
  },
});

const hamburger = document.querySelector(".navbar-toggler");

const offcanvas = document.querySelector(".offcanvas");
const stickyTop = document.querySelector(".sticky-top");

hamburger.addEventListener("click", function () {
  stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// KLIK UNDANGAN DAN SONG
const rootElement = document.querySelector(":root");
const audioIconwrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isplaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageYOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  // INI DI OFF IN
  localStorage.setItem("opened", "true");
  playAudio();
}

function playAudio() {
  // song.volume = 0.5;
  audioIconwrapper.style.display = "flex";
  song.play();
  isplaying = true;
}

audioIconwrapper.onclick = function () {
  if (isplaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isplaying = !isplaying;
};

// INI DI OFF IN
if (!localStorage.getItem("opened")) {
  disableScroll();

  // INI DI OFF IN
}

// KONFIRMASI UNDANGAN
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  let isSubmitting = false;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi kehadiran berhasil terkirim!");
      isSubmitting = false;
    });
  });
});

// URL
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronoun = urlParams.get("p") || "Kepada Bapak/Ibu/Saudara/i";

const namaContainer = document.querySelector(".hero h4 span");
namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");

document.querySelector("#nama").value = nama;
