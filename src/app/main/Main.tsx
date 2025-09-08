import Button from "../Button/Button";
import Carousel from "../Carousel/Carousel";
import "./Main.scss";

export default function Main() {
    return (
        <>
            <div className="box box-first" id="box1">
                <p className="title">Some short note about project</p>
                <Button>Join today</Button>
            </div>
            <div className="box box-second" id="box2">
                <Carousel />
            </div>
            <div className="box box-third" id="box3">
                <div className="moving-bg"></div>
                <p>Longer big title declaring something</p>
                <p className="p2">And some description</p>
            </div>
        </>
    );
}