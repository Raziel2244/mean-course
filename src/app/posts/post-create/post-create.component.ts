import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private id: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.id).subscribe(postData => {
          this.isLoading = false;
          this.post = postData;
        });
      } else {
        this.mode = 'create';
        this.id = null;
      };
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    };
    const post: Post = {
      id: this.id,
      title: form.value.title,
      content: form.value.content
    };
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(post);
    } else {
      this.postsService.updatePost(post);
    }
    form.resetForm();
  }
}
