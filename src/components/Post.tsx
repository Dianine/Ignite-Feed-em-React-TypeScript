import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import Avatar from './Avatar'

import styles from './Post.module.css'
import Comment from './Comment'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
  name: string;
  role: string;
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | "link",
  content: string
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein?!'])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedAtDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const pubishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNemComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')

  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewComentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string) {
    console.log('ssssssss')
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>

          <Avatar
            src={post.author.avatarUrl}
            alt={'Imagem perfil'}
          />

          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedAtDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {pubishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}> {line.content} </p>;
          } else if (line.type === 'link') {
            return <p key={line.content}> <a href="#"> {line.content} </a> </p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNemComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleNewCommentChange}
          value={newCommentText}
          name='comment'
          placeholder='Deixe um comentário'
          required={true}
          onInvalid={handleNewComentInvalid}
        />
        <footer>
          <button
            type='submit'
            disabled={isNewCommentEmpty}
          >
            Públicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}