import DOMParserReact from 'dom-parser-react'

type Props = {
  htmlText: string
}

const PostContent = ({ htmlText }: Props) => {
  return <DOMParserReact source={htmlText} />
}

export default PostContent
