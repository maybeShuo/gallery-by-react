
//获取图片相关数据
const imageData = require("../data/imageData.json");

//生成图片路径
function genImageURL() {
    imageData.map((item) => {
        item.imageURL = "assets/images/" + item.fileName;
    });
}
genImageURL();

function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

function getDegRandom() {
    return ((Math.random() > 0.5 ? '' : '-')) + Math.ceil(Math.random() * 30);
}

let ImgFigure = React.createClass({
    render: function() {

        let styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }

        if(this.props.arrange.rotate){
            (['-moz-', '-ms-', '-webkit-']).forEach(function(value) {
                styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        return (
            <figure className="img-figure" style={styleObj}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
});

const GalleryByReactApp = React.createClass({
    Constant: {
        centerPos: {
            left: 0,
            right: 0,
        },
        hPosRange: { //水平方向的取值范围
            leftSecX: [ 0, 0 ],
            rightSecX: [ 0, 0 ],
            y:[ 0, 0 ]
        },
        vPosRange: { //垂直方向的取值范围
            x: [ 0, 0 ],
            topY: [ 0, 0 ]
        }
    },

    reArrange: function(centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,

            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            //居中centerIndex的图片
            imgsArrangeCenterArr[0].pos = centerPos;

            //居中的图片不需要旋转
            imgsArrangeCenterArr[0].rotate = 0;

            //取出要布局上侧的图片状态信息
            topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

            //布局上侧图片
            imgsArrangeTopArr.map((item, index) => {
                item.pos = {
                    top: getRangeRandom(vPosRange.topY[0], vPosRange.topY[1]),
                    left: getRangeRandom(vPosRange.x[0], vPosRange.x[1])
                };
                item.rotate = getDegRandom();
                return item;
            });

            //布局左右两侧的图片
            let len = imgsArrangeArr.length;
            imgsArrangeArr.map((item, index) => {
                let hPosRangeX = null;

                if(index < (len / 2)){
                    hPosRangeX = hPosRange.leftSecX;
                } else {
                    hPosRangeX = hPosRange.rightSecX;
                }

                item.pos = {
                    top: getRangeRandom(hPosRange.y[0], hPosRange.y[1]),
                    left: getRangeRandom(hPosRangeX[0], hPosRangeX[1])
                };
                item.rotate = getDegRandom();

                return item;
            });

            if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }

            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });


    },

    getInitialState: function() {
        return {
            imgsArrangeArr: [
                {
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    rotate: 0 //旋转角度
                }
            ]
        };
    },

    //组件加载以后，为每张图片计算其位置的范围
    componentDidMount: function() {

        let stageDom = ReactDOM.findDOMNode(this.refs.stage);
        let stageW = stageDom.scrollWidth;
        let stageH = stageDom.scrollHeight;
        let halfStageW = Math.ceil(stageW / 2);
        let halfStageH = Math.ceil(stageH / 2);

        let imgFigureDom = ReactDOM.findDOMNode(this.refs.ImgFigure0);
        let imgW = imgFigureDom.scrollWidth;
        let imgH = imgFigureDom.scrollHeight;
        let halfImgW = Math.ceil(imgW / 2);
        let halfImgH = Math.ceil(imgH / 2);

        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        },

        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.reArrange(0);

    },

    render: function() {
        const controllerUnits = [],
            imgFigures = [];

        imageData.map(function(item, index) {
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0
                }
            }
            imgFigures.push(<ImgFigure data={item} ref={"ImgFigure" + index} arrange={this.state.imgsArrangeArr[index]}/>);
            return item;

        }.bind(this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                </nav>
            </section>
        );
    }
});


ReactDOM.render(
  <GalleryByReactApp />,
  document.getElementById('content')
);
