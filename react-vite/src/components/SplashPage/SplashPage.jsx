import './SplashPage.css'

import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export function SplashPage() {
    return (
        <div className='splash-page-container'>
            <div className='splash-page-body'>
                <div className='splash-welcome-div'>
                    <h1>Welcome to Kevle!</h1>
                    <h3>A site where you can create and play your own NYT Connections and more! <br /><br />
                        There will be more features coming, but for now, use the nav bar to see the games that people have created and leave a comment! <br /><br />
                        Signing up will also allow you to make your own games.<br /><br />
                        Created using React/Redux and Flask.</h3>
                </div>
                <div>
                    <h1>Meet the Developer:</h1>
                    <div className='splash-dev-name-icon-div'>
                        <h2>Kevin Fan</h2>
                        <a href="https://github.com/Kyfan01"><FaGithubSquare className='splash-icon' title='Github' /></a>
                        <a href="https://www.linkedin.com/in/kevin-fan-20475a162/"><FaLinkedin className='splash-icon' /></a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SplashPage
