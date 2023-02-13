import React, {Component} from 'react';

export class NotePagingComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {
            num: 1 
            ,paging: {}
        }

    }
    
    componentDidMount(){
    this.setState({
        num: this.props.num
        ,paging: this.props.paging
    })
    }
    // state 갱신용, render 직전 실행
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.paging !== nextProps.paging){
            return {
                num: nextProps.num
                ,paging: nextProps.paging
            }
        }
    }
  
    goPage(page){
        this.props.pageNo(page);
    }

    viewPaging() {
        const pageNums = [];
        for ( let i = this.props.paging.startPageNum; i<= this.props.paging.endPageNum; i++) {
            pageNums.push(i)
        }
        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()}>
            <a className="page-link" onClick= {() => this.goPage(page)}>{page}</a>
        </li>
        ));
    }
    isPagingPrev(){
        if(this.props.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.goPage(this.props.num-1)} tabIndex="-1">이전</a>
                </li>
            );
        }
    }
    
    isPagingNext(){
        if (this.props.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.goPage(this.props.num+1)} tabIndex="-1">다음</a>
                </li>
            )
        }
    }
    isMoveToFirstPage() {
        if (this.props.num !==1){
            return ( 
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.goPage(1)} tabIndex="-1">처음으로</a>
                </li>
            )
        }
    }
    isMoveToLastPage() {
        if(this.props.paging.endPageNum !== this.props.paging.lastPage) {
            return (
                <li className="page-item">
                    <a className = "page-link" onClick = {() => this.goPage(this.props.paging.lastPage)} tabIndex="-1"> 마지막으로({this.props.paging.lastPage})</a>
                </li>
            )
        }
    }
    render(){
            return(
            <div style={{justifyContent:"center"}}>
                <div className="row" style={{justifyContent:"center", clear:"both"}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {
                            this.isMoveToFirstPage()
                        }
                        {
                            this.isPagingPrev()
                        }
                        {
                            this.viewPaging()
                        }
                        {
                            this.isPagingNext()
                        }
                        {
                            this.isMoveToLastPage()
                        }
                    </ul>
                </nav>
                </div> 
            </div>
            )
    }
}

export default NotePagingComponent;