import './style.css'

const TopNav = () => {
    return <>
        <div className='topnav'>
            <div>
                <p className='logo'>Anubhav Kumar</p>
            </div>
            <div className='flex-vertical-center'>
                <div className='topnav'>
                    <p className='link'>About Me</p>
                    <p className='link'>Recent Trips</p>
                    <p className='link'>Work Life</p>
                    <p className='link'>Quick Links</p>
                </div>
            </div>
            
        </div>
    </>
}

export default TopNav;
