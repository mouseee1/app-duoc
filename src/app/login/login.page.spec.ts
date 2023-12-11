import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Users } from './user.model';
import { of } from 'rxjs';
import { RipService } from './rip.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let ripServiceMock: { getUserByEmail: jasmine.Spy<jasmine.Func>; };
  let router: Router;
  let afAuthMock: Partial<AngularFireAuth>;

  beforeEach(async () => {
    ripServiceMock = {
      getUserByEmail: jasmine.createSpy('getUserByEmail').and.returnValue(of({ rol: 'Alumno' } as Users)),
    };

    afAuthMock = {
      signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({ user: {} })),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: RipService, useValue: ripServiceMock },
        { provide: AngularFireAuth, useValue: afAuthMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a la página del alumno en inicio de sesión exitoso para alumno', waitForAsync(async () => {
    component.email = 'alumno@example.com';
    component.password = 'password';

    await component.login(component.email, component.password);

    expect(ripServiceMock.getUserByEmail).toHaveBeenCalledWith(component.email);
    expect(router.navigate).toHaveBeenCalledWith(['/alumno'], jasmine.any(Object));
  }));

  it('debería navegar a la página del profesor en inicio de sesión exitoso para profesor', waitForAsync(async () => {
    component.email = 'profesor@example.com';
    component.password = 'password';

    ripServiceMock.getUserByEmail.and.returnValue(of({ rol: 'Profesor' } as Users));

    await component.login(component.email, component.password);

    expect(ripServiceMock.getUserByEmail).toHaveBeenCalledWith(component.email);
    expect(router.navigate).toHaveBeenCalledWith(['/profesor'], jasmine.any(Object));
  }));

  it('debería registrar un error si el rol del usuario es desconocido', waitForAsync(async () => {
    component.email = 'unknown@example.com';
    component.password = 'password';

    ripServiceMock.getUserByEmail.and.returnValue(of({ rol: 'RolDesconocido', name: '', email: '', password: '' } as unknown as Users));

    spyOn(console, 'error');

    await component.login(component.email, component.password);

    expect(ripServiceMock.getUserByEmail).toHaveBeenCalledWith(component.email);
    expect(console.error).toHaveBeenCalledWith('Error: Rol desconocido');
  }));

  it('debería registrar un error si no se encuentra el usuario o el rol', waitForAsync(async () => {
    component.email = 'noexistente@example.com';
    component.password = 'password';

    ripServiceMock.getUserByEmail.and.returnValue(of(null));

    spyOn(console, 'error');

    await component.login(component.email, component.password);

    expect(ripServiceMock.getUserByEmail).toHaveBeenCalledWith(component.email);
    expect(console.error).toHaveBeenCalledWith('Error: Usuario no encontrado o sin rol');
  }));

  it('debería registrar un error si falla la autenticación', waitForAsync(async () => {
    component.email = 'error@example.com';
    component.password = 'password';
  
    spyOn(console, 'error');
  
    await component.login(component.email, component.password);
  
    expect(console.error).toHaveBeenCalledWith('Error de autenticación:', jasmine.any(String));
  }));
  
});
