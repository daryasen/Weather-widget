class NavigationBar {
    selectHeader: NodeListOf<Element>;
    selectItem: NodeListOf<Element>;
    selectArrow: Element | null;
    text?: Element | null;
    select: Element | null;
    currentText: any;
    innerText?: Element | null;
    parentElement?: Element | null;
    closest: any;
    classList: any;

    constructor() {
        this.selectHeader  = document.querySelectorAll('.header-tabs_select-header');
        this.selectItem = document.querySelectorAll('.header-tabs_select-item');
        this.selectArrow = document.querySelector('.svg-arrow');
        this.select = document.querySelector('.header-tabs_select-current');
        this.text = this.text;
        this.innerText = this.innerText;
        this.currentText = this.currentText;
    }

    public selectitems() {         // создание селекта
        this.selectHeader.forEach(item => {
            item.addEventListener('click', this.selectToggle); // переключаем класс .is-active у .header-tabs_select показывая .header-tabs_select-body.
        });

        this.selectItem.forEach(item => {
            item.addEventListener('click', this.selectChoose);
        }); 
     }

    public selectToggle() {   
        this.parentElement?.classList.toggle('is-active'); // а .header-tabs_select имея чайлд .header-tabs_select-body, показывает его.
    };

    public selectChoose() {
        this.text = this.innerText; 
        this.select = this.closest('.header-tabs_select');
        this.currentText = this.select?.querySelector('.header-tabs_select-current'); 
        this.currentText.innerText = this.text; 
        this.select?.classList.remove('is-active'); 
        //this.filterSelect(this.text);
        navBar.removeCheckMarkClass();
        this.classList?.add('check-mark'); 
        
    };

    public removeCheckMarkClass() {
        this.selectItem.forEach(item => {
            item.classList.remove('check-mark'); // удаляем класс .check-mark (убираем галочку)
        });
    };

    public reverseArrow() {
        this.selectArrow?.addEventListener('click', function(this: any): void {
            this.classList.toggle('reverse-arrow'); 
        })
    } 
}

let navBar = new NavigationBar();
navBar.selectitems();
navBar.reverseArrow();
