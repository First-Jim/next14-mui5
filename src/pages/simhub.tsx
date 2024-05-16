import { FC,useEffect } from "react"

 
const Requirement: FC = () => {
  useEffect(()=> {
     fetch('/simhub/task/list', { method: 'POST',headers:{
      'Content-Type': 'application/json'
     },body: JSON.stringify({
      approvalStatus: 1,
      pageNo: 1,
      pageSize: 10,
      tags: []
    })}).then(res => {
      console.log('res: ', res.json());

    })
  },[])
  return <div>simhub</div>
}

export default Requirement