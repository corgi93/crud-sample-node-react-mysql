import tutorialController from '../controllers/tutorial.controller';
import {Router} from 'express'


const AppRouter = app => {
    const router = Router();

    // tutorial 생성
    router.post('/' , tutorialController.create);
    // 모든 tutorial 검색
    router.get('/' , tutorialController.findAll);
    // published 된 튜토리얼 검색
    router.get('/published' , tutorialController.findAllPublished);

    // id에 해당하는 튜토리얼 검색
    router.get('/:id', tutorialController.findOne );

    // id에 해당하는 튜토리얼 업데이트
    router.put('/:id' , tutorialController.update);

    // id에 해당하는 튜토리얼 삭제
    router.delete('/:id' , tutorialController.delete);

    // 모든 튜토리얼 삭제
    router.delete('/' , tutorialController.deleteAll);

    app.use('/api/tutorials' ,router);
}

module.exports = AppRouter;