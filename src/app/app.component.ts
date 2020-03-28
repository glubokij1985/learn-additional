import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { RefDirective } from './ref.directive';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild(RefDirective, {static: false}) public refDir: RefDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private title: Title,
    private meta: Meta,
  ) {
    this.title.setTitle('My Angular App');
    this.meta.addTags([
      {name: 'keywords', content: 'My Super Puper Angular App'},
      {name: 'description', content: 'It is the best Angular App'}
    ]);
  }

  public showModal() {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    this.refDir.containerRef.clear();

    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.title = 'Dynamic title';
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}

