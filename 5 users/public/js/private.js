const deleteCokie = () => {
  fetch("/cookie/del")
    .then((data) => {
      window.location.href = "/login"
      return console.log(data)
    })
    .then((data) => {
      console.log("asd")
    })
}
