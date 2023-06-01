
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  
  createPromises(delay, step, amount);
}

function createPromises(delay, step, amount) {
  const promises = [];
  
  for (let i = 0; i < amount; i++) {   
    const promise = createPromise(i + 1, delay);
    promises.push(promise);
    
    delay += step;
  }
  
  Promise.allSettled(promises)
    .then(results => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const { position, delay } = result.value;
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          const { position, delay } = result.reason;
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

