import { Container } from 'react-bootstrap'
import utilStyles from 'styles/utils.module.css'



export default function Home({allPostsData}) {
    return (
        <Container>
            hello world!
        </Container>
    )
}

export async function getStaticProps() {
    return {
        props: {
        }
    }
}