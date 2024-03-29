/**
 * Output html button switch data
 */
export function switchDataStorage() {
  const objSwitch = {
    storage: 'Перейти на серверное хранилище',
    api: 'Перейти на локальное хранилище'
  }
  let btnSwitch = document.createElement('button');
  btnSwitch.classList.add('btn', 'btn-info', 'btn-sm');
  btnSwitch.type = 'button';
  btnSwitch.textContent
    = localStorage.getItem('switch') ? objSwitch[localStorage.getItem('switch')] : objSwitch.storage;
  btnSwitch.dataset.switch
    = localStorage.getItem('switch') ? localStorage.getItem('switch') : Object.keys(objSwitch)[0];

  let contentBtn = document.createElement('div');
  contentBtn.classList.add('text-center');
  let container = document.querySelector('div.container');

  if (!localStorage.getItem('switch')) {
    localStorage.setItem('switch', Object.keys(objSwitch)[0]);
  }

  btnSwitch.addEventListener('click', () => {
    for (const key in objSwitch) {
      if (key !== btnSwitch.dataset.switch) {
        btnSwitch.dataset.switch = key;
        btnSwitch.textContent = objSwitch[key];
        localStorage.setItem('switch', key);
        break;
      }
    }
    location.reload();
  });

  contentBtn.append(btnSwitch);
  container.append(contentBtn);
}
