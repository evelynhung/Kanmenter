const BASEURL = "./data";

class APIHelper {
  static fetch(postId) {
    let url = `${BASEURL}/comments.json`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }
  static post() {
  }
}

class Kanmenter extends Inferno.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
    this.stylesheet = `${BASEURL}/style.css`;
    this.defaultAvatarUrl = "https://www.ingles-markets.com/images/twitter-100px.png";
    this.init();
  }

  init() {
    APIHelper.fetch(100).then((data) => {
      this.setState({comments: data.comments});
    });
  }

  render() {
    return (
      <div>
        <link type="text/css" rel="stylesheet" href={this.stylesheet}></link>
        <h1>{this.state.comments.length} comments</h1>
        {
          this.state.comments.map((comment) => {
            return (
                <Comment id={comment.id} data={comment}></Comment>
            );
          })
        }
      </div>
    );
  }
}

class Comment extends Inferno.Component {
  constructor(props) {
    super(props);
    this.defaultAvatarUrl = "https://www.ingles-markets.com/images/twitter-100px.png";
  }
  render() {
    return (
      <div id={this.props.id} class="comment">
        <div class="avatar">
          <img src={this.defaultAvatarUrl} class="avatarImage"></img>
        </div>
        <div class="author">{this.props.data.author}</div>
        <div class="time">{this.props.data.time}</div>
        <div class="content">{this.props.data.content}</div>
        <CommentForm parentId={this.props.id}></CommentForm>
      </div>
    );
  }
}

class CommentForm extends Inferno.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeholderMessage = "Type Comment Here (at least 3 chars)";
  }
  handleClick(evt) {
    this.setState({display: true});
  }
  handleSubmit() {
  }
  render() {
    if (!this.state.display) {
      return (
        <a href="#" class="reply" onClick={this.handleClick}>Reply</a>
      );
    }
    return (
        <form class="reply" data-parent={this.props.parentId} onSubmit={this.handleSubmit}>
          <textarea class="textarea" placeholder={this.placeholderMessage}>
          </textarea>
          <input type="text" placeholder="name(optional)" class="name" />
          <input type="text" placeholder="email(optional)" class="email" />
          <input type="text" placeholder="website(optional)" class="website" />
          <input type="submit" value="Submit" class="submit" />
          <input type="hidden" value={this.props.parentId} />
        </form>
    );
  }

}

Inferno.render(<Kanmenter />, document.getElementById('kanmenter'));

