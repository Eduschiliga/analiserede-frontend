import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {buildUsuario, Usuario} from '../../model/usuario';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {UsuarioService} from '../../../usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  imports: [
    Button,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    RouterLink
  ],
  standalone: true,
  providers: [MessageService, ConfirmationService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  protected form: Usuario = buildUsuario();

  constructor(
    private usuarioApi: UsuarioService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  public login() {

    if (this.form.login != '' && this.form.senha != '') {
      this.usuarioApi.salvar(this.form).subscribe(
        {
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: "Usuário cadastrado com sucesso!"
            });
          },
          error: (error: HttpErrorResponse) => {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
          },
          complete: () => {
            this.router.navigate(['/']).then();
            return;
          }
        }
      );

    } else {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: "Campos inválidos!"});
    }
  }

}
