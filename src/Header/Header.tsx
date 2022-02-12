import classes from "./Header.module.css";


export function Header() {
    return (
        <div className={classes.headerBody}>
            <img style={{width:'30px', height: '30px'}}
                 src="data:image/png;base64,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"
                 alt={'logo'}/>

        </div>
    )
}