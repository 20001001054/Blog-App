import React, {useState,useEffect} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from '../Appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'

function EditPosts() {
    const[post, setPosts] = useState(null)
    const{slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug,navigate])
  return post ? (
    <div className='puy-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPosts
