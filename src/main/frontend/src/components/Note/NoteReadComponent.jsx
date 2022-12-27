// import React, { Component } from 'react'
// import { withRouter } from './NoteListComponent';
// import * as NoteService from '../../service/NoteService.js';

// class NoteReadComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userId: this.props.location.state.userId
//             ,no: this.props.params.no
//             ,note: {}
//         }
//     }

//     componentDidMount(no) {
//         no=this.state.no
//         NoteService.noteRead(no).then((res) => {
//         console.log(res.data);
//         this.setState({note: res.data[0]});
//         console.log(this.state.note)
        
//         });
//     }

//     goToList() {
//         this.props.navigate('/note/'+this.state.userId)
//     }

//     noteDelete = async function() {
//         if(window.confirm("삭제하시겠습니까?")){
//             NoteService.noteDelete(this.state.no).then(res => {
//                 console.log("result => " + JSON.stringify(res));
//                 if (res.status == 200) {
//                     this.props.navigate('/note/'+this.state.userId);
//                 } else {
//                     alert("실패!")
//                 }
//             });
//         }

//     }

//     render() {
        
//         return (
//             <div>
//                 <div className = "card col-md-6 offset-md-3">
//                     <h3 className = "text-center"> Read Detail </h3>
//                     <div className = "card-body">
//                         <div className="row">
//                             <label> Title </label> : {this.state.note.title}
//                         </div>
//                         <div className = "row">
//                             <label> Contents </label> : <br></br>
//                             <textarea value={this.state.note.content} readOnly/>
//                         </div>
//                         {/* <div>
//                             {this.note.time}
//                         </div> */}
//                         <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>쪽지목록으로 이동</button>
//                         <button className="btn btn-primary" onClick={()=>this.noteDelete()} style={{marginLeft:"10px"}}>쪽지삭제</button>
//                     </div>
//                 </div>
                
//             </div>
//         )
//     }
// }

// export default withRouter(NoteReadComponent)