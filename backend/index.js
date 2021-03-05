const sanityClient = require('@sanity/client');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 5000;

//Setup Sanity Client

const client = sanityClient({
  projectId: 'z9l7ba4w',
  dataset: 'production',
  token: '', 
  useCdn: false // `false` if you want to ensure fresh data
})

io.on('connection', (socket) => {
  console.log('a user connected');

  client.fetch(query, params).then(records => {
    console.log(records);
    io.emit('newData', records);
  })
});

app.get('/', (req, res) => {
  res.send('Welcome the Sales Records API');
});



//Listen for data changes in Sanity
const query = '*[_type == "salesrecords"]';
const params = {};

const subscription = client.listen(query, params)
  .subscribe(newRecords => {
    console.log(JSON.stringify(newRecords.result, null, 4));

    client.fetch(query, params).then(records => {
        console.log(records);
        io.emit('newData', records);
    })

    
  })

http.listen(port, () => {
  console.log(`API running on port : ${port}`);
});