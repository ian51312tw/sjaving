import PropTypes from 'prop-types'
import '../scss/DecorativeElements.scss'

// 分頁標籤裝飾組件
export const SectionTab = ({ fileName, className = '', position = 'left' }) => {
    return (
        <div className={`section-tab ${position} ${className}`}>
            <div className="tab-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1"/>
                    <path d="M6 3V1.5A1.5 1.5 0 017.5 0h1A1.5 1.5 0 0110 1.5V3" stroke="currentColor" strokeWidth="1"/>
                </svg>
            </div>
            <span className="tab-filename">{fileName}</span>
        </div>
    )
}

// 代碼標籤裝飾組件（左上角）
export const CodeTagDecorator = ({ content, type = 'section', position = 'top-left' }) => {
    const getTagContent = () => {
        switch (type) {
            case 'section':
                return `<section className="${content}">`
            case 'p':
                return `<p style="color:blue;">`
            case 'nav':
                return '<nav>'
            case 'close-section':
                return '</section>'
            case 'close-nav':
                return '</nav>'
            case 'close-p':
                return '</p>'
            default:
                return content
        }
    }

    return (
        <div className={`code-tag-decorator ${position}`}>
            <span className="code-content">{getTagContent()}</span>
        </div>
    )
}

// CSS 樣式裝飾組件（左側）
export const CSSDecorator = ({ selector, properties = [] }) => {
    return (
        <div className="css-decorator">
            <div className="css-content">
                <div className="css-selector">.{selector} {'{'}</div>
                {properties.map((prop, index) => (
                    <div key={index} className="css-property">
                        {prop}
                    </div>
                ))}
                <div className="css-selector">{'}'}</div>
            </div>
        </div>
    )
}

// 顏文字裝飾組件
export const EmoticonDecorator = ({ emoticon = "\\( ˘ ∇ ˘ )/", position = 'top-right' }) => {
    return (
        <div className={`emoticon-decorator ${position}`}>
            <span className="emoticon">{emoticon}</span>
        </div>
    )
}

// 主要裝飾容器組件
export const DecoratedSection = ({ 
    children, 
    fileName, 
    cssSelector = null,
    cssProperties = [],
    showEmoticon = false,
    emoticonContent = "\\( ˘ ∇ ˘ )/",
    codeTagType = 'section',
    sectionName = 'indexArea1',
    className = ''
}) => {
    return (
        <section className={`decorated-section ${className}`}>
            {/* 分頁標籤 */}
            <SectionTab fileName={fileName} position="top-left" />
            
            {/* 代碼標籤 */}
            <CodeTagDecorator 
                content={sectionName} 
                type={codeTagType} 
                position="top-left-code" 
            />
            
            {/* CSS 裝飾 */}
            {cssSelector && (
                <CSSDecorator 
                    selector={cssSelector} 
                    properties={cssProperties} 
                />
            )}
            
            {/* 顏文字裝飾 */}
            {showEmoticon && (
                <EmoticonDecorator 
                    emoticon={emoticonContent} 
                    position="top-right" 
                />
            )}
            
            {/* 關閉標籤 */}
            <CodeTagDecorator 
                type="close-section" 
                position="bottom-right" 
            />
            
            {/* 主要內容 */}
            <div className="section-content">
                {children}
            </div>
        </section>
    )
}

// PropTypes
SectionTab.propTypes = {
    fileName: PropTypes.string.isRequired,
    className: PropTypes.string,
    position: PropTypes.string
}

CodeTagDecorator.propTypes = {
    content: PropTypes.string,
    type: PropTypes.oneOf(['section', 'p', 'nav', 'close-section', 'close-nav', 'close-p']),
    position: PropTypes.string
}

CSSDecorator.propTypes = {
    selector: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.string)
}

EmoticonDecorator.propTypes = {
    emoticon: PropTypes.string,
    position: PropTypes.string
}

DecoratedSection.propTypes = {
    children: PropTypes.node.isRequired,
    fileName: PropTypes.string.isRequired,
    cssSelector: PropTypes.string,
    cssProperties: PropTypes.arrayOf(PropTypes.string),
    showEmoticon: PropTypes.bool,
    emoticonContent: PropTypes.string,
    codeTagType: PropTypes.string,
    sectionName: PropTypes.string,
    className: PropTypes.string
}