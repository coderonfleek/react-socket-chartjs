import { useEffect, useState } from "react";
const sanityClient = require('@sanity/client');

const useSanityListener = (projectId) => {
  const [salesRecords, setRecords] = useState([]); 

  const client = sanityClient({
    projectId: projectId,
    dataset: 'production',
    token: '', 
    useCdn: false // `false` if you want to ensure fresh data
  })

  //Listen for data changes in Sanity
  const query = '*[_type == "salesrecords"]';
  const params = {};

  fetchRecords();

  useEffect(() => {
    
    const subscription = client
    .listen(query, params)
    .subscribe(newRecords => {
        console.log(JSON.stringify(newRecords.result, null, 4));

        fetchRecords();
    })
    
    
    return () => {
        subscription.unsubscribe();
    };
  }, [projectId]);

  function fetchRecords(){
    client.fetch(query, params).then(records => {
        console.log(records);
        setRecords(records)
        
    })
  }

  
  return { salesRecords, setRecords };
};

export default useSanityListener;