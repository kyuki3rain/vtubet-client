const api = (path: string) => {
  let url = "";

  if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:3001/'
  }
  else if(process.env.NODE_ENV === 'production') {
    url = 'https://vtubet.herokuapp.com/'
  }

  return url + path;
}

export default api;