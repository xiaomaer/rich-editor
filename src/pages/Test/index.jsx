import React, { Component } from 'react';
import QuillEditor from '../../components/Quill';
import DraftEditor from '../../components/Draft';
import DemoDraft from '../../components/Draft/demo';
import DraftPlugin from '../../components/DraftPlugin';

const htmlStr='<p><strong>1</strong></p><p><strong><br/></strong><span></span><em>2</em></p><p><em><br/></em><span></span><span style="text-decoration:underline;">222</span></p><p><span style="text-decoration:underline;"><br/></span><span></span><span style="text-decoration:line-through;">2222</span></p><p><span style="text-decoration:line-through;"><br/></span><span></span><span style="color: rgb(255, 0, 0);">333333</span></p><ol class=" list-paddingleft-2" style="list-style-type: decimal;"><li style="list-style-type: decimal;"><p><span style="color: rgb(255, 0, 0);">234234<br/></span></p></li></ol><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li style="list-style-type: disc;"><p><span style="color: rgb(255, 0, 0);">234234234<br/></span></p></li><li style="list-style-type: disc;"><p><span style="color: rgb(255, 0, 0);"><span style="font-family: 黑体, SimHei;">234234234</span><br/></span></p></li></ul><p><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;">234234234</span></span></span></p><p style="text-align: center; "><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;">234234234</span></span></span></p><p style="text-align: right;"><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;">234234234</span></span></span></p><blockquote style="margin: 0 0 0 40px; border: none; padding: 0px;"><p style="text-align: left;"><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;">234234</span></span></span></p><p style="text-align: left;"><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;"><a href="http://www.baidu.com" target="_blank" title="ddd">ddd</a><br/></span></span></span></p><p style="text-align: left;"><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;"><img src="http://i1.hexun.com/2018-11-24/195299306.jpg"/></span></span></span></p><p style="text-align: left;"><span style="color:#ff0000;font-family:黑体, SimHei"><span style="white-space: pre-wrap;"><span style="font-size: 48px;"><video class="edui-faked-video" controls="controls" src="http://video.699pic.com/videos/69/64/54/qgE4wF14Rye61523696454.mp4" width="420" height="280" style="float:none"></video></span></span></span></p></blockquote><hr/><blockquote style="margin: 0 0 0 40px; border: none; padding: 0px;"><table><tbody><tr class="firstRow"><td width="100" valign="top" style="word-break: break-all;">1</td><td width="100" valign="top"><br/></td><td width="100" valign="top"><br/></td><td width="100" valign="top"><br/></td></tr><tr><td width="100" valign="top"><br/></td><td width="100" valign="top" style="word-break: break-all;">1</td><td width="100" valign="top"><br/></td><td width="100" valign="top"><br/></td></tr><tr><td width="100" valign="top"><br/></td><td width="100" valign="top"><br/></td><td width="100" valign="top" style="word-break: break-all;">1</td><td width="100" valign="top"><br/></td></tr><tr><td width="100" valign="top"><br/></td><td width="100" valign="top"><br/></td><td width="100" valign="top"><br/></td><td width="100" valign="top" style="word-break: break-all;">1s</td></tr></tbody></table></blockquote>';
export default class Test extends Component {
    constructor(props){
        super(props);
        this.state={
            value:''
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
            ['clean','link'],                                         // 清除格式
            ['divider']
          ];
        const options={
            toolbar:toolbarOptions,
            defaultValue:htmlStr
        }
        return (
            <div style={{margin:20}}>
                <h2>1、基于quill的react富文本编辑器：</h2>
                <QuillEditor {...options} onChange={this.handleChange} onSelectionChange={this.handleSelectionChange} value={this.state.value}/>
                <h2>2、基于draft的react富文本编辑器：</h2>
                {/* <DraftEditor/> */}
                <DemoDraft defaultValue={htmlStr}/>
                <h2>3、draft plugin：</h2>
                <DraftPlugin/>
            </div>
        )
    }
}
