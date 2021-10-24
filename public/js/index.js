if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
  })
}

let total = 0

axios.get('/api/user', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: user }) => {
    user.transactions.forEach(transaction => {
      const transactionElem = document.createElement('div')
      transactionElem.classList = 'col-sm-3'
      transactionElem.style = 'margin-top: 25px;'
      transactionElem.innerHTML = `
    <div class="card">
      <div class="card-body" id=${transaction._id}>
        <h5 class="card-title" style="margin-bottom: 20px;">${transaction.name}</h5>
        <h6>$${transaction.value}</h6>
    `
      document.getElementById('transactions').append(transactionElem)
      total = total + transaction.value
    })
    const totalElem = document.createElement('div')
    totalElem.classList = 'col-sm-12'
    totalElem.style = 'margin-top: 25px;'
    totalElem.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" style="margin-bottom: 20px;" id="totalText">Total: $${total}</h5>
    `
    document.getElementById('total').append(totalElem)
  })
  .catch(err => window.location = './auth.html')

document.getElementById('deposit').addEventListener('click', event => {
  event.preventDefault()

  let transaction = {
    name: document.getElementById('name').value,
    value: JSON.parse(document.getElementById('amount').value)
  }
  axios.post('/api/transactions', transaction, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data }) => {
      let transactionElem = document.createElement('div')
      transactionElem.classList = 'col-sm-3'
      transactionElem.style = 'margin-top: 25px;'
      transactionElem.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" style="margin-bottom: 20px;">${transaction.name}</h5>
        <h6>$${transaction.value}</h6>
      `
      document.getElementById('transactions').append(transactionElem)
      total = total + transaction.value
      document.getElementById('totalText').innerText = `Total: $${total}`
      document.getElementById('name').value = ''
      document.getElementById('amount').value = ''
    })
    .catch(err => {
      console.error(err)
      saveRecord(transaction)
      let transactionElem = document.createElement('div')
      transactionElem.classList = 'col-sm-3'
      transactionElem.style = 'margin-top: 25px;'
      transactionElem.innerHTML = `
      <div class="card">
      <div class="card-body">
        <h5 class="card-title" style="margin-bottom: 20px;">$${transaction.name}</h5>
        <h6>${transaction.value}</h6>
      `
      document.getElementById('transactions').append(transactionElem)
      total = total + transaction.value
      document.getElementById('totalText').innerText = `Total: $${total}`
      document.getElementById('name').value = ''
      document.getElementById('amount').value = ''
    })
})

document.getElementById('withdraw').addEventListener('click', event => {
  event.preventDefault()

  let transaction = {
    name: document.getElementById('name').value,
    value: JSON.parse(`-${document.getElementById('amount').value}`)
  }
  axios.post('/api/transactions', transaction, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data }) => {
      let transactionElem = document.createElement('div')
      transactionElem.classList = 'col-sm-3'
      transactionElem.style = 'margin-top: 25px;'
      transactionElem.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" style="margin-bottom: 20px;">${transaction.name}</h5>
        <h6>$${transaction.value}</h6>
      `
      document.getElementById('transactions').append(transactionElem)
      total = total + transaction.value
      document.getElementById('totalText').innerText = `Total: $${total}`
      document.getElementById('name').value = ''
      document.getElementById('amount').value = ''
    })
    .catch(err => {
      console.error(err)
      saveRecord(transaction)
      let transactionElem = document.createElement('div')
      transactionElem.classList = 'col-sm-3'
      transactionElem.style = 'margin-top: 25px;'
      transactionElem.innerHTML = `
      <div class="card">
      <div class="card-body">
        <h5 class="card-title" style="margin-bottom: 20px;">${transaction.name}</h5>
        <h6>$${transaction.value}</h6>
      `
      document.getElementById('transactions').append(transactionElem)
      total = total + transaction.value
      document.getElementById('totalText').innerText = `Total: $${total}`
      document.getElementById('name').value = ''
      document.getElementById('amount').value = ''
    })
})
