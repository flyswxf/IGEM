class PolygonRoller {
    constructor(container) {
      this.roller = container.querySelector('.polygon-roller');
      this.items = Array.from(container.querySelectorAll('.research-item'));
      this.currentIndex = 0;
      this.angleStep = 360 / this.items.length;
      this.isAnimating = false;
      
      // 绑定右侧详情面板
      this.detailPanel = {
        content: document.querySelector('.detail-content'),
        title: document.querySelector('.detail-title'),
        researcher: document.querySelector('.researcher'),
        date: document.querySelector('.date'),
        text: document.querySelector('.detail-text'),
        // prevArrow: document.querySelector('.arrow.prev'),
        // nextArrow: document.querySelector('.arrow.next')
      };
      // 绑定右侧箭头事件
      // this.detailPanel.prevArrow.addEventListener('click', () => this.rotate(-1));
      // this.detailPanel.nextArrow.addEventListener('click', () => this.rotate(1));

      // 研究数据示例
      this.researchData = [
        {
          title: "基因回路优化",
          researcher: "王小明",
          date: "2024.03",
          text: "通过改进启动子组合策略...",
          // 可扩展更多字段
        },
        {
          title: "高通量筛选平台",
          researcher: "李晓红", 
          date: "2024.05",
          text: "开发新型筛选平台提升效率..."
        },
        {
          title: "生物传感器设计",
          researcher: "张大山",
          date: "2024.07",
          text: "设计新型生物传感器用于...",
        }
      ];

      this.dotsContainer = container.querySelector('.dots-container');
      this.dots = [];
  
      // 初始化3D布局
      this.initLayout();
      this.bindEvents();

      this.updateDetailContent();  // 初始化右侧内容

       // 在初始化布局后创建指示点
      this.createDotsIndicator();
    }
  
    initLayout() {
      this.items.forEach((item, index) => {
        const angle = this.angleStep * index;
        item.style.transform = `
          rotateY(${angle}deg) 
          translateZ(${this.calculateZOffset()})
        `;
      });
    }
  
    calculateZOffset() {
      const radius = 500; // 滚筒半径
      return Math.round(radius / Math.tan(Math.PI / this.items.length)) + 'px';
    }
  
    bindEvents() {
      let lastScroll = 0;
      const scrollThreshold = 50;
  
      this.roller.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastScroll < 400) return;
        lastScroll = now;
  
        const direction = Math.sign(e.deltaY);
        this.rotate(direction);
      });

      // 添加惯性滚动支持
      let momentum = 0;
      let lastTime = 0;
      
      this.roller.addEventListener('wheel', (e) => {
        const now = Date.now();
        const deltaTime = now - lastTime;
        lastTime = now;

        momentum = e.deltaY * Math.min(1, 100/deltaTime);
        if (Math.abs(momentum) > 50) {
          this.rotate(Math.sign(momentum));
        }
      });
    }
  
    rotate(direction) {
      if (this.isAnimating) return;
      this.isAnimating = true;
  
      this.currentIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
      
      const targetAngle = this.currentIndex * this.angleStep;
      this.roller.style.transform = `rotateY(${-targetAngle}deg)`;
  
      this.updateActiveState();
      this.updateDotsPosition();
      this.updateDetailContent();
      
      setTimeout(() => {
        this.isAnimating = false;
      }, 1000);
    }

    // 新增方法：更新右侧内容
    updateDetailContent() {
      const data = this.researchData[this.currentIndex];
      this.detailPanel.title.textContent = data.title;
      this.detailPanel.researcher.textContent = data.researcher;
      this.detailPanel.date.textContent = data.date;
      this.detailPanel.text.textContent = data.text;
    }

  
    // 新增方法：创建指示点
    createDotsIndicator() {
      this.items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => this.jumpToIndex(index));
        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
      });
    }

    updateDotsPosition() {
      const activeDot = this.dots[this.currentIndex];
      const dotRect = activeDot.getBoundingClientRect();
      const containerRect = this.dotsContainer.getBoundingClientRect();
      
      this.dots.forEach(dot => {
        const offset = (dot.offsetLeft - containerRect.left) - 
                      (activeDot.offsetLeft - containerRect.left);
        dot.style.transform = `translateX(${offset * -0.2}px)`;
      });
    }

    // 新增方法：跳转到指定索引
    jumpToIndex(targetIndex) {
      if (this.isAnimating || targetIndex === this.currentIndex) return;
      
      const direction = targetIndex -this.currentIndex;
      // this.currentIndex = targetIndex;
      this.rotate(direction);
    }

    updateActiveState() {
        this.items.forEach((item, index) => {
          const isActive = index === this.currentIndex;
          
          // 切换 active 样式
          item.classList.toggle('active', isActive);

          // 更新指示点状态
          this.dots[index].classList.toggle('active', isActive);
          
          // 保证卡片的布局同步
          const angle = this.angleStep * index;
          item.style.transform = `
            rotateY(${angle}deg)
            translateZ(${this.calculateZOffset()})
            scale(${isActive ? 1 : 0.9})
          `;
        });
      }
      
  }
  
  // 初始化滚筒
  new PolygonRoller(document.querySelector('.timeline-container'));