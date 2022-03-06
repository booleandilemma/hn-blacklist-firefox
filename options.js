const getFromStorage = keys => {
  if (chrome.storage) {
    return new Promise((resolve, reject) =>
      chrome.storage.local.get(keys, resolve)
    );
  } else {
    return browser.storage.local.get(keys);
  }
};

const setToStorage = object => {
  if (chrome.storage) {
    return new Promise((resolve, reject) =>
      chrome.storage.local.set(object, resolve)
    );
  } else {
    return browser.storage.local.set(object);
  }
};

function saveOptions(e) {
  e.preventDefault();
  setToStorage({
    domains: document.querySelector("#domains").value
  });
}

function restoreOptions() {
  function setCurrentChoice({ domains }) {
    console.log(domains);
    document.querySelector("#domains").value =
      domains || defaultTitles.join("\n");
  }

  getFromStorage("domains").then(setCurrentChoice);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#domains").onchange = saveOptions;
