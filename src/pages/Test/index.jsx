import React, { Component } from 'react';
import QuillEditor from '../../components/Quill';

export default class Test extends Component {
    constructor(props){
        super(props);
        this.state={
            value:'xm'
        }
    }
    handleChange=(html,delta, source)=>{
        console.log(html,delta, source)
        this.setState({
            value:html
        })
    }
    handleSelectionChange=(range, source)=>{
        console.log(range, source)
    }
    render() {
        const toolbarOptions =  [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  // 用户自定义下拉
            [{ 'color': [] }, { 'background': [] }],          // 主题默认下拉，使用主题提供的值
            ['bold', 'italic', 'underline', 'strike'],        // 切换按钮
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 减少缩进/缩进
            ['image'],
            [{ 'align': 'left' },{ 'align': 'center' },{ 'align': 'right' },{ 'align': 'justify' }],
            ['blockquote', 'code-block'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['clean','link']                                         // 清除格式
          ];
        const options={
            toolbar:toolbarOptions,
            defaultValue:'xiaoma'
        }
        return (
            <div style={{margin:20}}>
                <h2>1、基于quill的react富文本编辑器：</h2>
                <QuillEditor {...options} onChange={this.handleChange} onSelectionChange={this.handleSelectionChange} value={this.state.value}/>
            </div>
        )
    }
}
