#! /usr/bin/env node
const fs=require('fs');
const path=require('path');
const [,,command,...args]=process.argv;
const filePath=path.join(__dirname,'todo.json');
console.log(__dirname);
console.log(filePath);
// Further implementation of TO-DO list functionalities will go here.
function fileExists()
{

  if(!fs.existsSync(filePath))
  {
    fs.writeFileSync(filePath,JSON.stringify([],null,2),'utf-8');
    console.log('Created new todo.json file.');

  }
}
fileExists(); 

const data=JSON.parse(fs.readFileSync(filePath,'utf-8'));
if (command==='add')
{
  const taskName = args.join(' '); // Join all args for multi-word tasks
  if (!taskName) {
    console.log('⚠️ Please provide a task name.');
    process.exit(1);
  }
  const newId = data.length>0?data[data.length-1].id+1:1;
    const formattedDate = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const newTask = { id: newId, task: taskName, status: 'todo' ,date:formattedDate,lastupdate:formattedDate};
  data.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Added task: "${taskName}" with ID: ${newId}`);
}
else if (command==='update')
{
  const id=args[0];
  const newTask=  args.slice(1).join(' ');
  const idIndex=data.findIndex(item=>item.id==id);
  if(id===-1)
  {
    console.log(`❌ Task "${id}" not found.`);   
  }
  else{
    data[idIndex].task=newTask;
    data[idIndex].lastupdate=new Date(new Date().toISOString()).toLocaleString;
        const formattedDate = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
    data[idIndex].lastupdate=formattedDate;
    fs.writeFileSync(filePath,JSON.stringify(data,null,2),'utf-8');
    console.log(`✅ Updated task ID: ${id} to "${newTask}"`); 
  }
}
else if(command==='delete')
{
  const id=args[0];
  const dataIndex=data.findIndex(item=>item.id==id);
  if(dataIndex===-1)
  {
    console.log(`❌ Task "${id}" not found.`);   
  }
  else{
    data.splice(dataIndex,1);
    for(let i=dataIndex;i<data.length;i++)
    {
      data[i].id-=1;
    }
    fs.writeFileSync(filePath,JSON.stringify(data,null,2),'utf-8');
    console.log(`✅ Deleted task ID: ${id}`); 
  }
}
else if(command==='mark-done' || command==='mark-in-progress')
{
  const id=args[0];
  const dataIndex=data.findIndex(item=>item.id==id);
  if(dataIndex===-1)
  {
    console.log(`❌ Task "${id}" not found.`);   
  } 
  else{
    const newStatus=command==='mark-done'?'done':'in-progress';
    data[dataIndex].status=newStatus;
        const formattedDate = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
    data[dataIndex].lastupdate=formattedDate;
    fs.writeFileSync(filePath,JSON.stringify(data,null,2),'utf-8');
    console.log(`✅ Marked task ID: ${id} as "${newStatus}"`); 
  } 
}
else if(command==='list')
{
  console.log(args.length);
  if(args.length===0)
  {
    if(data.length===0)
  {
    console.log('📭 No tasks found. Your to-do list is empty!');
  }
  else{
    console.log('📝 Your To-Do List:');
    data.forEach(item=>{
      let line=`ID: ${item.id}\nDescription: ${item.task}\nStatus: ${item.status}\nCreatedAt: ${item.date}`;
      if(item.lastupdate)
      {
        line+=`\nUpdatedAt: ${item.lastupdate}`;
      } 
      console.log(line+'\n--------------------\n');  
    });
  }
}
else{
    const statusFilter=args[0];
    const filteredData=data.filter(item=>item.status===statusFilter);
    if(filteredData.length===0)
    {
      console.log(`📭 No tasks found with status "${statusFilter}".`); 
    }
    else{
      console.log(`📝 Your To-Do List (Status: "${statusFilter}"):`);
      filteredData.forEach(item=>{
        let line=`ID: ${item.id}\nTask: ${item.task}\nStatus: ${item.status}\nCreatedAt: ${item.date}`;
        if(item.lastupdate)
        {
          line+=`\nUpdatedAt: ${item.lastupdate}`;
        }
        console.log(line+'\n--------------------\n');
      }); 
    }
}

}

