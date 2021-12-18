import styles from './boxes.module.sass'

const SingleBox = ({ props }) => {
    const { caseImage, casePrice, isHot, caseType, caseName } = props
    return (
        <div className={styles.boxItem}>
            <div className={styles.imagePart}>
                <img alt="case image" height="170" src={caseImage} />
            </div>

            <div className={styles.detailPart}>
                <h1>{caseName}</h1>
                <div className={styles.tags}>
                    {isHot && <div className={styles.hot}>
                        <img src="https://cdn.discordapp.com/attachments/765933010733760564/920748346912686151/unknown.png" />
                        <p>HOT</p>
                        <small>{caseType.join(', ')}</small>
                    </div>}

                </div>
                <p className={styles.price}>${casePrice}</p>
            </div>

            <div className={styles.btnPart}>
                <a href="">View</a>
            </div>
        </div>
    )
};

export default SingleBox;
